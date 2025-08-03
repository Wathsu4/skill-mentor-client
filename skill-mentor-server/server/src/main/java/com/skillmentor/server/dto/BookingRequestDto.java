package com.skillmentor.server.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequestDto {

    @NotNull
    private Long classroomId;

    @NotNull
    private Long mentorId;

    @NotNull
    @Future
    private LocalDateTime sessionDateTime;

    @Size(max = 1000)
    private String studentName;

    // Payment slip will be handled as MultipartFile in controller, so not here
}
