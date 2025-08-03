package com.skillmentor.server.service.Impl;

import com.skillmentor.server.dto.MentorClassDto;
import com.skillmentor.server.dto.MentorProfileDto;
import com.skillmentor.server.model.Mentor;
import com.skillmentor.server.repository.MentorRepository;
import com.skillmentor.server.repository.SessionRepository;
import com.skillmentor.server.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MentorServiceImpl implements MentorService {

    private final MentorRepository mentorRepository;
    private final SessionRepository sessionRepository;

    @Override
    public MentorProfileDto getMentorProfile(Long mentorId) {
        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        MentorProfileDto dto = new MentorProfileDto();
        dto.setId(mentor.getId());
        dto.setName(mentor.getFirstName() + " " + mentor.getLastName());
        dto.setBio(mentor.getBio());
        dto.setImageUrl(mentor.getImageUrl());

        List<MentorClassDto> classDTOs = mentor.getClasses().stream().map(classroom -> {
            long count = sessionRepository.countByClassroomIdAndMentorId(classroom.getId(), mentor.getId());

            MentorClassDto cdto = new MentorClassDto();
            cdto.setClassId(classroom.getId());
            cdto.setClassName(classroom.getName());
            cdto.setStudentCount((int) count);
            return cdto;
        }).collect(Collectors.toList());

        dto.setClasses(classDTOs);
        return dto;
    }
}
