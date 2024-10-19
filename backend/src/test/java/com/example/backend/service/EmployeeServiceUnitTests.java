package com.example.backend.service;

import com.example.backend.domain.Employee;
import com.example.backend.repository.EmployeeRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class EmployeeServiceUnitTests {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    @Test
    public void testAddEmployee() {
        Employee employee = new Employee();
        employee.setFirstName("John");
        employee.setLastName("Doe");
        employee.setEmail("john.doe@example.com");
        employee.setPhone("123-456-7890");
        employee.setAddress("1234 Elm St, Some City");
        employee.setImageUrl("https://example.com/image.jpg");
        employee.setPosition("Software Engineer");

        Mockito.when(employeeRepository.save(employee)).thenReturn(employee);

        Employee createdEmployee = employeeService.addEmployee(employee);
        assertNotNull(createdEmployee);
        assertEquals("John", createdEmployee.getFirstName());
        assertEquals("Doe", createdEmployee.getLastName());
        assertEquals("john.doe@example.com", createdEmployee.getEmail());
        assertEquals("123-456-7890", createdEmployee.getPhone());
        assertEquals("1234 Elm St, Some City", createdEmployee.getAddress());
        assertEquals("https://example.com/image.jpg", createdEmployee.getImageUrl());
        assertEquals("Software Engineer", createdEmployee.getPosition());

        Mockito.verify(employeeRepository, Mockito.times(1)).save(employee);
    }

    @Test
    public void testGetAllEmployees() {
        Employee employee1 = new Employee();
        employee1.setFirstName("John");
        employee1.setLastName("Doe");
        employee1.setEmail("john.doe@example.com");
        employee1.setPhone("123-456-7890");
        employee1.setAddress("1234 Elm St");
        employee1.setImageUrl("https://example.com/image1.jpg");
        employee1.setPosition("Software Engineer");

        Employee employee2 = new Employee();
        employee2.setFirstName("Jane");
        employee2.setLastName("Smith");
        employee2.setEmail("jane.smith@example.com");
        employee2.setPhone("987-654-3210");
        employee2.setAddress("5678 Oak St");
        employee2.setImageUrl("https://example.com/image2.jpg");
        employee2.setPosition("Product Manager");

        List<Employee> employeeList = Arrays.asList(employee1, employee2);

        Mockito.when(employeeRepository.findAll()).thenReturn(employeeList);

        List<Employee> result = employeeService.getAllEmployees();
        assertEquals(2, result.size());
        assertEquals("John", result.get(0).getFirstName());
        assertEquals("Jane", result.get(1).getFirstName());

        Mockito.verify(employeeRepository, Mockito.times(1)).findAll();
    }

    @Test
    public void testUpdateEmployee() {
        Employee existingEmployee = new Employee();
        existingEmployee.setId(1L);
        existingEmployee.setFirstName("John");
        existingEmployee.setLastName("Doe");
        existingEmployee.setEmail("john.doe@example.com");
        existingEmployee.setPhone("123-456-7890");
        existingEmployee.setAddress("1234 Elm St");
        existingEmployee.setImageUrl("https://example.com/image.jpg");
        existingEmployee.setPosition("Software Engineer");

        Employee updatedEmployee = new Employee();
        updatedEmployee.setId(1L);
        updatedEmployee.setFirstName("John Updated");
        updatedEmployee.setLastName("Doe Updated");
        updatedEmployee.setEmail("john.updated@example.com");
        updatedEmployee.setPhone("987-654-3210");
        updatedEmployee.setAddress("5678 Oak St");
        updatedEmployee.setImageUrl("https://example.com/image_updated.jpg");
        updatedEmployee.setPosition("Senior Engineer");

        Mockito.when(employeeRepository.save(updatedEmployee)).thenReturn(updatedEmployee);

        Employee result = employeeService.updateEmployee(updatedEmployee);
        assertNotNull(result);
        assertEquals("John Updated", result.getFirstName());
        assertEquals("Doe Updated", result.getLastName());
        assertEquals("john.updated@example.com", result.getEmail());
        assertEquals("987-654-3210", result.getPhone());
        assertEquals("5678 Oak St", result.getAddress());
        assertEquals("https://example.com/image_updated.jpg", result.getImageUrl());
        assertEquals("Senior Engineer", result.getPosition());

        Mockito.verify(employeeRepository, Mockito.times(1)).save(updatedEmployee);
    }

    @Test
    public void testDeleteEmployee() {
        long employeeId = 1L;

        Mockito.doNothing().when(employeeRepository).deleteById(employeeId);

        employeeService.deleteEmployee(employeeId);

        Mockito.verify(employeeRepository, Mockito.times(1)).deleteById(employeeId);
    }
}
