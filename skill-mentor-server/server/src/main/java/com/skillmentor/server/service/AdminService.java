package com.skillmentor.server.service;

import com.skillmentor.server.dto.ClassroomDto;
import com.skillmentor.server.dto.MentorDto;
import com.skillmentor.server.model.Classroom;
import com.skillmentor.server.model.Mentor;

import java.util.List;

public interface AdminService {

    Classroom createClassroom(ClassroomDto classroomDto);

    Mentor createMentor(MentorDto mentorDto);

    Mentor assignMentorToClasses(Long mentorId, List<Long> classroomIds);

    List<Classroom> getAllClassrooms();

    List<Mentor> getAllMentors();

    List<?> getAllBookings(); // Will return Sessions or a DTO, to be refined
}
