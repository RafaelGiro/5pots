import { useState, useEffect, useRef, useContext } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";

import { useForm } from "react-hook-form";
import MdNavigateNext from "@meronex/icons/md/MdNavigateNext";
import MdLock from "@meronex/icons/md/MdLock";
import MdLockOutline from "@meronex/icons/md/MdLockOutline";
import ReCAPTCHA from "react-google-recaptcha";

import Typography from "../../atoms/Typography";
import TextField from "../../atoms/TextField";
import Button from "../../atoms/Button";

import api from "../../../core/services/api";
import { passwordValidation } from "../../../core/constants/formValidation";
import UIContext from "../../../core/contexts/UIContext";

import styles from "../../templates/AuthPage/styles.module.scss";

const FormReset = () => {
  const [status, setStatus] = useState(0);
  const { register, handleSubmit, watch, errors } = useForm();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { uiDispatch: dispatch } = useContext(UIContext);
  const router = useRouter();
  const { token } = router.query;

  const confirmValidation = {
    minLength: {
      value: 6,
      message: "Hey, a senha precisa ter no mínimo 6 caracteres.",
    },
    required: "Confirme sua senha.",
    validate: (value: string) =>
      value === watch("password") || "As senhas informadas não são iguais",
  };

  useEffect(() => {
    if (token)
      api
        .get(`/auth/reset?token=${token}`)
        .then((res) => {
          setStatus(res.status);
        })
        .catch(() => {
          dispatch({
            type: "SHOW_SNACKBAR",
            snackbar: {
              msg: "O token informado não é mais válido :(",
              variant: "error",
            },
          });
        });
  }, [token]);

  const onSubmit = async (data: Record<string, string>) => {
    await recaptchaRef?.current?.executeAsync();
    api
      .post(`/auth/forgot/${token}`, data)
      .then(() => {
        dispatch({
          type: "SHOW_SNACKBAR",
          snackbar: {
            msg: "Senha alterada com sucesso.",
            variant: "success",
          },
        });
        router.push("/auth/login");
      })
      .catch((err) => {
        dispatch({
          type: "SHOW_SNACKBAR",
          snackbar: {
            msg: err.response.data.message,
            variant: "error",
          },
        });
      });
  };

  function renderContent() {
    switch (status) {
      case 0:
        return <div />;
      case 200:
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              name="password"
              label="Nova senha"
              type="password"
              icon={MdLock}
              ref={register(passwordValidation)}
              errors={errors}
              required
            />
            <TextField
              name="confirmation"
              label="Confirme sua senha"
              type="password"
              icon={MdLockOutline}
              ref={register(confirmValidation)}
              errors={errors}
              required
            />
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA as string}
            />
            <div className="auth-page__cta">
              <Button
                type="submit"
                variant="icon"
                className={clsx(
                  styles["auth-page__cta__btn"],
                  styles["auth-page__cta__btn--forgot"]
                )}
              >
                <MdNavigateNext />
              </Button>
            </div>
          </form>
        );
      default:
        return (
          <div>
            <Link href="/auth/forgot/password">
              <Typography component="p" variant="p">
                Hey, seu token não é mais válido :(
              </Typography>

              <Typography component="p" variant="p">
                Clique aqui para gerar um novo token.
              </Typography>
            </Link>
          </div>
        );
    }
  }

  return (
    <div className={styles["auth-page__form"]}>
      <Typography
        variant="h2"
        component="h1"
        className={styles["auth-page__form__title"]}
      >
        CRIAR
      </Typography>
      <Typography
        className={styles["auth-page__form__sub-title"]}
        component="h2"
        variant="h3"
      >
        NOVA SENHA
      </Typography>
      {renderContent()}
    </div>
  );
};

export default FormReset;
