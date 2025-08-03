package com.skillmentor.server.controller;

import com.skillmentor.server.dto.MentorProfileDto;
import com.skillmentor.server.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MentorController {

    private final MentorService mentorService;

    /**
     * Get mentor profile with associated classes and student counts
     * @param id The ID of the mentor
     * @return MentorProfileDto containing mentor details and class information
     */
    @GetMapping("/api/mentors/{id}")
    public ResponseEntity<MentorProfileDto> getMentorProfile(@PathVariable Long id) {
        return ResponseEntity.ok(mentorService.getMentorProfile(id));
    }
}
