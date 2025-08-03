package com.skillmentor.server.controller;

import com.skillmentor.server.dto.ClassroomDto;
import com.skillmentor.server.dto.MentorDto;
import com.skillmentor.server.model.Classroom;
import com.skillmentor.server.model.Mentor;
import com.skillmentor.server.model.Session;
import com.skillmentor.server.model.BookingStatus;
import com.skillmentor.server.service.AdminService;
import com.skillmentor.server.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final SessionRepository sessionRepository;

    @PostMapping("/classes")
    public ResponseEntity<Classroom> createClassroom(@Valid @RequestBody ClassroomDto dto) {
        Classroom created = adminService.createClassroom(dto);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/mentors")
    public ResponseEntity<Mentor> createMentor(@Valid @RequestBody MentorDto dto) {
        Mentor created = adminService.createMentor(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/mentors/{mentorId}/classes")
    public ResponseEntity<Mentor> assignMentorToClasses(@PathVariable Long mentorId, @RequestBody List<Long> classroomIds) {
        Mentor updated = adminService.assignMentorToClasses(mentorId, classroomIds);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Session>> getAllBookings() {
        List<Session> bookings = sessionRepository.findAll();
        return ResponseEntity.ok(bookings);
    }

    @PatchMapping("/bookings/{bookingId}/approve")
    public ResponseEntity<?> approveBooking(@PathVariable Long bookingId) {
        Session session = sessionRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (session.getStatus() != BookingStatus.PENDING) {
            return ResponseEntity.badRequest().body("Only PENDING bookings can be approved");
        }
        session.setStatus(BookingStatus.ACCEPTED);
        sessionRepository.save(session);
        return ResponseEntity.ok("Booking approved");
    }

    @PatchMapping("/bookings/{bookingId}/complete")
    public ResponseEntity<?> completeBooking(@PathVariable Long bookingId) {
        Session session = sessionRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (session.getStatus() != BookingStatus.ACCEPTED) {
            return ResponseEntity.badRequest().body("Only ACCEPTED bookings can be completed");
        }
        session.setStatus(BookingStatus.COMPLETED);
        sessionRepository.save(session);
        return ResponseEntity.ok("Booking completed");
    }
}
