package com.example.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "employees")
@ToString
@Data
@NoArgsConstructor
@EqualsAndHashCode
@Getter
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Size(min = 2, max = 50, message = "First name should be between 2 and 50 characters")
    private String firstName;
    @Size(min = 2, max = 50)
    private String lastName;
    @Size(min = 2, max = 50)
    @Email(regexp = ".+@.+\\..+")
    private String email;
    @Size(min = 2, max = 50)
    @Pattern(regexp = "\\d+")
    private String phone;
    @Size(min = 2, max = 50)
    private String address;
    @Size(min = 5, max = 300)
    private String imageUrl;
    @Size(min = 5, max = 50)
    private String position;
}
