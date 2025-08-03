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
@Table(name = "mentors")
public class Mentor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    private String title;

    private Double sessionFee;

    private String profession;

    @Column(length = 1000) // For a longer bio text
    private String bio;

    private String phoneNumber;

    private String qualification;

    private String imageUrl;

    // This is the owning side of the relationship
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "mentor_classes",
            joinColumns = @JoinColumn(name = "mentor_id"),
            inverseJoinColumns = @JoinColumn(name = "class_id")
    )
    private Set<Classroom> classes;
}