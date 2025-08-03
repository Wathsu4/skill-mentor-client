package com.skillmentor.server.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class MentorClassDto {
    private Long classId;
    private String className;
    private int studentCount;
}
