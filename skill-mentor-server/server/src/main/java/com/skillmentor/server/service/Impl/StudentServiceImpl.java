package com.skillmentor.server.service.Impl;

import com.skillmentor.server.dto.BookingRequestDto;
import com.skillmentor.server.model.Classroom;
import com.skillmentor.server.model.Mentor;
import com.skillmentor.server.model.Session;
import com.skillmentor.server.model.BookingStatus;
import com.skillmentor.server.repository.ClassroomRepository;
import com.skillmentor.server.repository.MentorRepository;
import com.skillmentor.server.repository.SessionRepository;
import com.skillmentor.server.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentServiceImpl implements StudentService {

    private final ClassroomRepository classroomRepository;
    private final MentorRepository mentorRepository;
    private final SessionRepository sessionRepository;

    private final Path paymentSlipStorage = Paths.get("payment-slips");

    @Override
    public List<Classroom> getAllClassesWithMentors() {
        return classroomRepository.findAll();
    }

    @Override
    public Session bookSession(String studentClerkId, BookingRequestDto dto, byte[] paymentSlipBytes, String paymentSlipFileName) {
        Classroom classroom = classroomRepository.findById(dto.getClassroomId())
                .orElseThrow(() -> new RuntimeException("Classroom not found"));

        Mentor mentor = mentorRepository.findById(dto.getMentorId())
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        if (paymentSlipBytes != null) {
            try {
                if (!Files.exists(paymentSlipStorage)) {
                    Files.createDirectories(paymentSlipStorage);
                }
                String ext = FilenameUtils.getExtension(paymentSlipFileName);
                String storedFileName = "payment_" + System.currentTimeMillis() + "." + ext;
                Path filePath = paymentSlipStorage.resolve(storedFileName);
                Files.write(filePath, paymentSlipBytes);
                String url = "/files/payment-slips/" + storedFileName;

                Session session = Session.builder()
                        .studentClerkId(studentClerkId)
                        .studentName(dto.getStudentName())
                        .classroom(classroom)
                        .mentor(mentor)
                        .sessionDateTime(dto.getSessionDateTime())
                        .status(BookingStatus.PENDING)
                        .paymentSlipUrl(url)
                        .build();
                return sessionRepository.save(session);

            } catch (IOException e) {
                throw new RuntimeException("Failed to save payment slip", e);
            }
        } else {
            throw new RuntimeException("Payment slip is required");
        }
    }

    @Override
    public List<Session> getBookingHistoryForStudent(String studentClerkId) {
        return sessionRepository.findByStudentClerkId(studentClerkId);
    }
}
