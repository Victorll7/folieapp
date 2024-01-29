import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseConfig } from "../../firebase-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from "react-native-elements";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("Correo electrónico requerido"),
  password: yup
    .string()
    .min(7, "La contraseña debe tener al menos 7 caracteres")
    .matches(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
    .matches(/\d/, "La contraseña debe contener al menos un número")
    .required("Contraseña requerida"),
});

const LoginForm = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Cuenta creada");
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("MainApp");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed In ");
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("MainApp");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const saveLoginData = async (data) => {
    try {
      await AsyncStorage.setItem("loginData", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving login data:", error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    if (rememberMe) {
      saveLoginData(data);
    }
    handleSubmit(handleSignIn)();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={(value) => {
              setEmail(value);
              onChange(value);
            }}
            value={value}
            style={styles.input}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={(value) => {
              setPassword(value);
              onChange(value);
            }}
            value={value}
            style={styles.input}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <View style={styles.rememberMeContainer}>
        <CheckBox
          checked={rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
          checkedColor="#6c5ce7"
          containerStyle={styles.checkboxContainer}
        />
        <Text style={styles.rememberMeText}>Recordar Usuario </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleCreateAccount)}
      >
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6c5ce7",
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  rememberMeText: {
    color: "#fff",
    marginLeft: 8,
  },
  checkboxContainer: {
    borderWidth: 0,
    backgroundColor: "transparent",
    margin: 0,
    padding: 0,
  },
});

export default LoginForm;
