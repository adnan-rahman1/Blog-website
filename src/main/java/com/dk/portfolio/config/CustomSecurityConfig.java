package com.dk.portfolio.config;

import com.dk.portfolio.exception.CustomAuthenticationExceptionHandler;
import com.dk.portfolio.security.CustomAuthenticationManager;
import com.dk.portfolio.security.JwtRequestFilter;
import com.dk.portfolio.service.UserService;
import org.apache.catalina.connector.Connector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configurable
@EnableWebSecurity
public class CustomSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtRequestFilter jwtRequestFilter;
    private final CustomAuthenticationExceptionHandler customAuthenticationExceptionHandler;
    private final CustomAuthenticationManager customAuthenticationManager;

    @Autowired
    public CustomSecurityConfig(
            UserService userService,
            PasswordEncoder passwordEncoder,
            JwtRequestFilter jwtRequestFilter,
            CustomAuthenticationManager customAuthenticationManager,
            CustomAuthenticationExceptionHandler customAuthenticationExceptionHandler
    ) {
        this.jwtRequestFilter = jwtRequestFilter;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.customAuthenticationManager = customAuthenticationManager;
        this.customAuthenticationExceptionHandler = customAuthenticationExceptionHandler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable().cors().and()
                .userDetailsService(userService);
        http
                .authorizeRequests()
                .mvcMatchers(HttpMethod.POST, "/api/user/authenticate").permitAll()
                .mvcMatchers(HttpMethod.GET, "/api/user/current-user").permitAll()
                .mvcMatchers(HttpMethod.GET, "/api/user/basic-info").permitAll()
                .mvcMatchers(HttpMethod.GET, "/api/blog/**").permitAll()
                .mvcMatchers(HttpMethod.GET, "/api/category/**").permitAll()
                .mvcMatchers(HttpMethod.GET, "/api/tag/**").permitAll()
                .mvcMatchers(HttpMethod.GET, "/api/project/**").permitAll()
                .mvcMatchers(HttpMethod.POST, "/api/user/create").hasRole("ADMIN")
                .mvcMatchers(HttpMethod.GET, "/blog/**").permitAll()
                .mvcMatchers(HttpMethod.GET, "/api/user/forget/password").permitAll()
                .mvcMatchers(HttpMethod.POST, "/api/user/forget/password").permitAll()
                .mvcMatchers(HttpMethod.GET, "/project").permitAll()
                .mvcMatchers(HttpMethod.GET, "/about").permitAll()
                .mvcMatchers(HttpMethod.GET, "/signin").permitAll()
                .mvcMatchers(HttpMethod.GET, "/signup").permitAll()
                .mvcMatchers(HttpMethod.GET, "/privacy-policy").permitAll()
                .mvcMatchers(HttpMethod.GET, "/cookies-policy").permitAll()
                .mvcMatchers(HttpMethod.GET, "/terms-conditions").permitAll()
                .mvcMatchers(HttpMethod.GET, "/disclaimer").permitAll()
                .anyRequest().hasAnyRole("ADMIN")
                .and()
                .exceptionHandling()
                .accessDeniedHandler(customAuthenticationExceptionHandler)
                .authenticationEntryPoint(customAuthenticationExceptionHandler)
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        http.rememberMe().userDetailsService(this.userService);
        http.logout().logoutUrl("/logout").logoutSuccessUrl("/").permitAll();

//        http.requiresChannel(channel -> channel.anyRequest().requiresSecure());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
       web.ignoring().antMatchers("/index.html", "/*.js", "/public/**", "/*.jpg", "/*.svg", "/*.webp", "/*.jpeg", "/*.png", "/*.ico");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .parentAuthenticationManager(customAuthenticationManager)
                .userDetailsService(userService)
                .passwordEncoder(passwordEncoder);

    }
}