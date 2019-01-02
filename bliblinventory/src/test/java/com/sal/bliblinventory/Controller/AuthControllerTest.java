package com.sal.bliblinventory.Controller;

import com.sal.bliblinventory.controller.AuthController;
import com.sal.bliblinventory.controller.UserController;
import com.sal.bliblinventory.model.User;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class AuthControllerTest {

  @Autowired
  private AuthController authController;

  private MockMvc mockMvc;

  @MockBean
  private UserController userController;

  @Autowired
  private WebApplicationContext webApplicationContext;



}
