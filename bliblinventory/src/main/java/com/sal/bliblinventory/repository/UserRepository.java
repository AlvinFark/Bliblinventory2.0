package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByNameContains(String name);
  Optional<User> findByUsernameOrEmail(String username, String email);
  Boolean existsByUsername(String username);
  Boolean existsByEmail(String email);

  User getUserById(Long userId);
  List<User> getAllUserByNameIsNotNull();
  List<User> getAllUserByName(String name);
  List<User> getAllUserByRoles(Long roleId);

  Boolean deleteUserById(Long userId);
}