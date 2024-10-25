import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
});