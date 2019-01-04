package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsernameOrEmail(String username, String email);
  Boolean existsByUsername(String username);
  Boolean existsByEmail(String email);

  User getUserById(Long userId);
  User getUserByUsername(String username);
  User getUserByUsernameOrEmailAndIsActive(String username, String email, boolean isActive);
  List<User> findAllByOrderByName();
  List<User> findAllByNameContainingOrderByName(String partName);
  List<User> getAllUserByName(String name);
  List<User> getAllUserByRoles(Long roleId);

  User getUserByUsernameOrEmail(String username, String email);

  User getFirstByOrderByIdDesc();

  Boolean deleteUserById(Long userId);
}