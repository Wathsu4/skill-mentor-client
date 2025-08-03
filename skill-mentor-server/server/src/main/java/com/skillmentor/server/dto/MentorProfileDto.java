package com.skillmentor.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MentorProfileDto {

    private Long id;
    private String name;
    private String bio;
    private String imageUrl;
    private List<MentorClassDto> classes;
}
