package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.Role;
import com.sal.bliblinventory.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleName roleName);
}
