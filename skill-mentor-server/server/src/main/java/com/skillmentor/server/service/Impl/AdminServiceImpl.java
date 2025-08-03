package com.skillmentor.server.service.Impl;

import com.skillmentor.server.dto.ClassroomDto;
import com.skillmentor.server.dto.MentorDto;
import com.skillmentor.server.model.Classroom;
import com.skillmentor.server.model.Mentor;
import com.skillmentor.server.repository.ClassroomRepository;
import com.skillmentor.server.repository.MentorRepository;
import com.skillmentor.server.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService {

    private final ClassroomRepository classroomRepository;
    private final MentorRepository mentorRepository;

    @Override
    public Classroom createClassroom(ClassroomDto dto) {
        Classroom classroom = Classroom.builder()
                .name(dto.getName())
                .imageUrl(dto.getImageUrl())
                .build();
        return classroomRepository.save(classroom);
    }

    @Override
    public Mentor createMentor(MentorDto dto) {
        Mentor mentor = Mentor.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .title(dto.getTitle())
                .profession(dto.getProfession())
                .bio(dto.getBio())
                .imageUrl(dto.getImageUrl())
                .build();
        return mentorRepository.save(mentor);
    }

    @Override
    public Mentor assignMentorToClasses(Long mentorId, List<Long> classroomIds) {
        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));
        List<Classroom> classrooms = classroomRepository.findAllById(classroomIds);
        mentor.getClasses().addAll(classrooms);
        return mentorRepository.save(mentor);
    }

    @Override
    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
    }

    @Override
    public List<Mentor> getAllMentors() {
        return mentorRepository.findAll();
    }

    @Override
    public List<?> getAllBookings() {
        // To be implemented
        return List.of();
    }
}
