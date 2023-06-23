package com.dk.portfolio.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
public class CustomAuthenticationExceptionHandler implements AuthenticationEntryPoint, AccessDeniedHandler {

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        httpServletResponse.sendError(401, "Invalid Username and Password");
//        handleResponse(
//                httpServletResponse,
//                "Invalid email and password",
//                HttpStatus.UNAUTHORIZED
//        );
    }


    @Override
    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AccessDeniedException e) throws IOException, ServletException {
         handleResponse(
                httpServletResponse,
                "You are not allowed to access this resource",
                HttpStatus.BAD_REQUEST);
    }

    public void handleResponse(HttpServletResponse httpServletResponse, String message, HttpStatus httpStatus) throws IOException {
//        ObjectMapper objectMapper = new ObjectMapper();
//        httpServletResponse.setStatus(httpStatus.value());
//        httpServletResponse.setContentType("text/html");
//        httpServletResponse.setCharacterEncoding("UTF-8");
//        String json = objectMapper
//                .writerWithDefaultPrettyPrinter()
//                .writeValueAsString(
//                        ResponseUtility.responseMessage(
//                                message,
//                                httpStatus
//                        ).getBody()
//                );
//        PrintWriter out = httpServletResponse.getWriter();
//        out.print(json);
//        out.flush();
    }

}
