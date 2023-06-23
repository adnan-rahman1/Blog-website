package com.dk.portfolio.exception;

import com.dk.portfolio.utility.ResponseUtility;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ResponseEntity<?> methodNotAllowed() {
        return ResponseUtility.responseMessage(
                "Not Allowed",
                HttpStatus.METHOD_NOT_ALLOWED
        );
    }

    @ExceptionHandler(RequestRejectedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<?> servletException() {
        return ResponseUtility.responseMessage(
                "Please check the URL",
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(ChangeSetPersister.NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<?> notFoundException() {
        return ResponseUtility.responseMessage(
                "Sorry, no content available",
                HttpStatus.NOT_FOUND
        );
    }
    @ExceptionHandler(CustomExceptionResponse.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<?> badRequest(CustomExceptionResponse cer) {
        Map<String, String> resMsg = new HashMap<>();
        resMsg.put("message", cer.getMessage());
        return new ResponseEntity<>(resMsg, HttpStatus.BAD_REQUEST);
    }
}

