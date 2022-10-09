package com.whe.employeemanagerapp.repo;

import com.whe.employeemanagerapp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    void deleteEmployeeById(Long id); //Spring uses this naming convention to delete by ID

    Optional<Employee> findEmployeeById(Long id); //Query method.
}

