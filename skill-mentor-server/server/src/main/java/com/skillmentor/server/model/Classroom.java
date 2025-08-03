package com.skillmentor.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "classrooms")
public class Classroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String imageUrl;

    // We use @ManyToMany(mappedBy = "classes") to indicate that the
    // 'Mentor' entity is the owner of this relationship.
    @ManyToMany(mappedBy = "classes")
    private Set<Mentor> mentors;
}