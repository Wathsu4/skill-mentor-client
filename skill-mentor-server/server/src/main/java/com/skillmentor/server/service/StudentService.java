package com.skillmentor.server.service;

import com.skillmentor.server.dto.BookingRequestDto;
import com.skillmentor.server.model.Classroom;
import com.skillmentor.server.model.Mentor;
import com.skillmentor.server.model.Session;

import java.util.List;

public interface StudentService {

    List<Classroom> getAllClassesWithMentors();

    Session bookSession(String studentClerkId, BookingRequestDto dto, byte[] paymentSlipBytes, String paymentSlipFileName);

    List<Session> getBookingHistoryForStudent(String studentClerkId);

}
