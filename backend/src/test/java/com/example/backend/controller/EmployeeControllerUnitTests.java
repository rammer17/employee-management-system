package com.example.backend.controller;

import com.example.backend.EmployeeController;
import com.example.backend.domain.Employee;
import com.example.backend.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EmployeeController.class)
public class EmployeeControllerUnitTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmployeeService employeeService;

    @Test
    public void testCreateEmployee() throws Exception {
        Employee employee = new Employee();
        employee.setFirstName("Jane");
        employee.setLastName("Smith");
        employee.setEmail("jane.smith@example.com");
        employee.setPhone("987-654-3210");
        employee.setAddress("5678 Oak St, Another City");
        employee.setImageUrl("https://example.com/jane.jpg");
        employee.setPosition("Product Manager");

        Mockito.when(employeeService.addEmployee(Mockito.any(Employee.class))).thenReturn(employee);

        mockMvc.perform(post("/employee/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"firstName\": \"Jane\", \"lastName\": \"Smith\", \"email\": \"jane.smith@example.com\", " +
                                "\"phone\": \"9876543210\", \"address\": \"5678 Oak St, Another City\", " +
                                "\"imageUrl\": \"https://example.com/jane.jpg\", \"position\": \"Product Manager\" }"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName").value("Jane"))
                .andExpect(jsonPath("$.lastName").value("Smith"))
                .andExpect(jsonPath("$.email").value("jane.smith@example.com"))
                .andExpect(jsonPath("$.phone").value("987-654-3210"))
                .andExpect(jsonPath("$.address").value("5678 Oak St, Another City"))
                .andExpect(jsonPath("$.imageUrl").value("https://example.com/jane.jpg"))
                .andExpect(jsonPath("$.position").value("Product Manager"));
    }

    @Test
    public void testDeleteEmployee() throws Exception {
        Mockito.doNothing().when(employeeService).deleteEmployee(1L);

        mockMvc.perform(delete("/employee/delete").param("id", Long.toString(1)))
                .andExpect(status().isOk());

        Mockito.verify(employeeService, Mockito.times(1)).deleteEmployee(1L);
    }
}
