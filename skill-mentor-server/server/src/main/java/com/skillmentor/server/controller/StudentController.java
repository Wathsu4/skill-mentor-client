package com.skillmentor.server.controller;

import com.skillmentor.server.dto.BookingRequestDto;
import com.skillmentor.server.model.Classroom;
import com.skillmentor.server.model.Session;
import com.skillmentor.server.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    /**
     * Get all classrooms with mentor info
     */
    @GetMapping("/classes")
    public ResponseEntity<List<Classroom>> getAllClasses() {
        List<Classroom> classrooms = studentService.getAllClassesWithMentors();
        return ResponseEntity.ok(classrooms);
    }

    /**
     * Book a session with file upload (bank slip)
     */
    @PostMapping(
            value = "/bookings",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Session> bookSession(
            @RequestHeader("X-Clerk-User-Id") String userId,
            @RequestPart("booking") @Valid BookingRequestDto bookingDto,
            @RequestPart("paymentSlip") MultipartFile paymentSlip
    ) throws IOException {
        byte[] slipBytes = paymentSlip.getBytes();
        String originalFilename = paymentSlip.getOriginalFilename();

        Session bookedSession = studentService.bookSession(
                userId,
                bookingDto,
                slipBytes,
                originalFilename
        );

        return ResponseEntity.ok(bookedSession);
    }

    /**
     * Get booking history for the logged-in student
     */
    @GetMapping("/dashboard")
    public ResponseEntity<List<Session>> getBookingHistory(
            @RequestHeader("X-Clerk-User-Id") String userId
    ) {
        List<Session> sessions = studentService.getBookingHistoryForStudent(userId);
        return ResponseEntity.ok(sessions);
    }
}
