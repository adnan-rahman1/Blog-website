package com.dk.portfolio.utility;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class ResponseUtility {

    public static ResponseEntity<?> errorResponse(List<FieldError> fieldErrors, HttpStatus httpStatus) {
        Map<String, String> resMsg = new HashMap<>();
        for (FieldError fieldError : fieldErrors) {
            resMsg.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return new ResponseEntity<>(resMsg, httpStatus);
    }

    public static ResponseEntity<?> responseMessage(Object o, String msg, HttpStatus httpStatus) {
        Map<String, Object> resMsg = new HashMap<>();
        resMsg.put("message", msg);
        resMsg.put(o.getClass().getSimpleName().toLowerCase(), o);
        return new ResponseEntity<>(resMsg, httpStatus);
    }

    public static ResponseEntity<?> responseMessage(String msg, HttpStatus httpStatus) {
        Map<String, Object> resMsg = new HashMap<>();
        resMsg.put("message", msg);
        return new ResponseEntity<>(resMsg, httpStatus);

    }
}