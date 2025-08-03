package com.skillmentor.server.service;

import com.skillmentor.server.dto.MentorProfileDto;

public interface MentorService {

    /**
     * Get mentor profile with associated classes and student counts
     * @param mentorId The ID of the mentor
     * @return MentorProfileDto containing mentor details and class information
     */
    MentorProfileDto getMentorProfile(Long mentorId);
}
