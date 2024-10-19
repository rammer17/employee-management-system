package com.example.backend.repository;

import com.example.backend.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrPositionContainingIgnoreCase(String firstName, String lastName, String position);
}
