package com.example.backend;

import com.example.backend.domain.Employee;
import com.example.backend.domain.Search;
import com.example.backend.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/all")
    public ResponseEntity getEmployee() {
        try {
            List<Employee> result = employeeService.getAllEmployees();
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity createEmployee(@RequestBody @Valid Employee employee, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            var errors = bindingResult.getFieldErrors();
            return ResponseEntity.badRequest().body(errors);
        }

        Employee result = employeeService.addEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping("/update")
    public ResponseEntity updateEmployee(@RequestBody Employee employee, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                var errors = bindingResult.getFieldErrors();
                return ResponseEntity.badRequest().body(errors);
            }

            Employee result = employeeService.updateEmployee(employee);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteEmployee(@RequestParam("id") Long id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/search")
    public ResponseEntity searchEmployees(@RequestBody Search request) {
        try {

            List<Employee> result = employeeService.searchEmployeeByNameOrPosition(request.getFirstName(), request.getLastName(), request.getPosition());
            return ResponseEntity.status(HttpStatus.OK).body(result);

        } catch (
                Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }
}
