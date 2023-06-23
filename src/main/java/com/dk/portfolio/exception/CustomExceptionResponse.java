package com.dk.portfolio.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CustomExceptionResponse extends RuntimeException {
    private final String messages;

    public CustomExceptionResponse(String messages) {
        super(messages);
        this.messages = messages;
    }
}
