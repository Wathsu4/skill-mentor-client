package com.skillmentor.server.repository;

import com.skillmentor.server.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    /**
     * Custom query to count sessions for a specific class and mentor.
     * This will be used in the Mentor Profile View feature.
     * Spring Data JPA automatically creates the query from the method name.
     */
    long countByClassroomIdAndMentorId(Long classroomId, Long mentorId);

    /**
     * Find all sessions for a specific student using their Clerk ID
     */
    List<Session> findByStudentClerkId(String studentClerkId);
}