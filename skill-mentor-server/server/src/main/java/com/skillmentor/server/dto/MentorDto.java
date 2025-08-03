package com.skillmentor.server.dto;

import lombok.*;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String title;
    private String profession;
    private String bio;
    private String imageUrl;
    private Set<ClassroomDto> classrooms;
}
