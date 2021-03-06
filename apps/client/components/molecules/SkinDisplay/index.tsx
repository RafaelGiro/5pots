import clsx from "clsx";
import CurrencyIcons from "../../atoms/Icons/CurrencyIcons";
import Typography from "../../atoms/Typography";
import Chromas from "./Chromas";
import styles from "./styles.module.scss";

const SkinDisplay = (props: Skin) => {
  const {
    border,
    chromas,
    id,
    interactions,
    name,
    prestige,
    price,
    splash,
    loading,
    spotlight,
    still,
    turn,
    vo,
    description,
    gemstone,
  } = props;

  const skinTier: Record<string, string> = {
    "1350": "Épica",
    "1820": "Lendária",
    "3250": "Ultimate",
  };

  const baseURL = "https://assets.5pots.com/file/cincopots/pbe";

  const splashClass = clsx(
    styles["skin-display__splash"],
    styles["skin-display__splash--border"]
  );

  const skinCurrency: {
    price: string;
    currency: "gemstone" | "rp" | "be" | "prestige";
  } = { price: "", currency: "rp" };

  if (gemstone) {
    skinCurrency.price = "Hextech - 10";
    skinCurrency.currency = "gemstone";
  } else if (prestige) {
    skinCurrency.price = "Prestígio";
    skinCurrency.currency = "prestige";
  } else {
    skinCurrency.price = `${skinTier[price]} - ${price}`;
    skinCurrency.currency = "rp";
  }

  return (
    <div className={styles["skin-display"]}>
      <div className={styles["skin-display__title"]}>
        <Typography variant="h4" component="h4">
          {name}
        </Typography>
        <div className={styles["skin-display__title__price"]}>
          <Typography variant="h4" component="h5">
            Skin {skinCurrency.price}
          </Typography>
          <CurrencyIcons currency={skinCurrency.currency} />
        </div>
      </div>
      <Typography
        variant="p"
        component="p"
        className={styles["skin-display__description"]}
      >
        {description}
      </Typography>
      <div className={splashClass}>
        {loading ? (
          <a href={`${baseURL}/${id}-loading.jpg`} target="blank">
            <img src={`${baseURL}/${id}-loading.jpg`} />
          </a>
        ) : (
          <div
            className={clsx(
              styles["skin-display__missing"],
              styles["skin-display__missing--loading"]
            )}
          >
            <img
              alt="Não existe asset de loading no client"
              src="https://assets.5pots.com/file/cincopots/backgrounds/missing-asset.jpg"
            />
            <Typography component="p" variant="sub">
              Nenhum asset para tela de carregamento no client
            </Typography>
          </div>
        )}
        {splash ? (
          <a href={`${baseURL}/${id}-splash.jpg`} target="blank">
            <img src={`${baseURL}/${id}-splash.jpg`} />
          </a>
        ) : (
          <div className={styles["skin-display__missing"]}>
            <img
              alt="Não existe asset de loading no client"
              src="https://assets.5pots.com/file/cincopots/backgrounds/missing-asset.jpg"
            />
            <Typography component="p" variant="sub">
              Nenhum asset para splash art no client
            </Typography>
          </div>
        )}
      </div>
      <div className={styles["skin-display__screenshots"]}>
        {still ? (
          <a href={`${baseURL}/${id}-still.jpg`} target="blank">
            <img src={`${baseURL}/${id}-still.jpg`} />
          </a>
        ) : (
          <div className={styles["skin-display__missing"]}>
            <img
              alt="Não existe asset de loading no client"
              src="https://assets.5pots.com/file/cincopots/backgrounds/missing-asset.jpg"
            />
            <Typography component="p" variant="sub">
              Jajá é pra ter um print do campeão parado de frente
            </Typography>
          </div>
        )}

        {turn ? (
          <a href={`${baseURL}/${id}-turn.jpg`} target="blank">
            <img src={`${baseURL}/${id}-turn.jpg`} />
          </a>
        ) : (
          <div className={styles["skin-display__missing"]}>
            <img
              alt="Não existe asset de loading no client"
              src="https://assets.5pots.com/file/cincopots/backgrounds/missing-asset.jpg"
            />
            <Typography component="p" variant="sub">
              Ainda não temos nenhum print com o 360 da skins
            </Typography>
          </div>
        )}
        {spotlight ? (
          <div className={styles["skin-display__video"]}>
            <iframe
              src={`https://www.youtube.com/embed/${spotlight.split("v=")[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div
            className={clsx(
              styles["skin-display__missing"],
              styles["skin-display__missing--video"]
            )}
          >
            <img
              alt="Não existe asset de loading no client"
              src="https://assets.5pots.com/file/cincopots/backgrounds/missing-asset.jpg"
            />
            <Typography component="p" variant="sub">
              Ainda não temos nenhum vídeo demonstrando a skin
            </Typography>
          </div>
        )}
        {vo && (
          <div className={styles["skin-display__video"]}>
            <iframe
              src={`https://www.youtube.com/embed/${vo.split("v=")[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {interactions && (
          <div className={styles["skin-display__video"]}>
            <iframe
              src={`https://www.youtube.com/embed/${
                interactions.split("v=")[1]
              }`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
      {/* <Typography
        variant="p"
        component="p"
        className={styles["skin-display__p"]}
      >
        A skin {name} {!border ? "(por enquanto?) não" : ""} possui uma borda
        para acompanhar a linha de skin.
        {!chromas.length ? " E (por enquanto?) não" : "Também"} teremos chromas{" "}
        {!chromas.length
          ? "inclusos no client :("
          : "que você confere logo abaixo :D"}
      </Typography> */}
      <div className={styles["skin-display__chromas-border"]}>
        <div>
          {border ? (
            <a href={`${baseURL}/${id}-border.jpg`} target="blank">
              <img src={`${baseURL}/${id}-border.jpg`} />
            </a>
          ) : (
            <div
              className={clsx(
                styles["skin-display__missing"],
                styles["skin-display__missing--border"]
              )}
            >
              <img
                alt="Não existe asset de loading no client"
                src="https://assets.5pots.com/file/cincopots/backgrounds/missing-asset.jpg"
              />
              <Typography component="p" variant="sub">
                (Por enquanto?) Não tem nenhum asset de borda no PBE
              </Typography>
            </div>
          )}
        </div>
        <Chromas chromas={chromas} id={id} />
      </div>
    </div>
  );
};

export default SkinDisplay;
