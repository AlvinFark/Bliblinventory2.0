package com.sal.bliblinventory.service.serviceImpl;

import com.sal.bliblinventory.model.User;
import com.sal.bliblinventory.repository.RoleRepository;
import com.sal.bliblinventory.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = UserServiceImplTest.class)
public class UserServiceImplTest {

  @InjectMocks
  private UserServiceImpl userServiceImpl;

  @MockBean
  RoleRepository roleRepositoryMock;

  @MockBean
  UserRepository userRepositoryMock;

  @MockBean
  PasswordEncoder passwordEncoderMock;

  @Before
  public void init(){
    MockitoAnnotations.initMocks(this);
  }

  
}
