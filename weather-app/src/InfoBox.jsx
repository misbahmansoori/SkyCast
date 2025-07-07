import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function InfoBox({ info }) {
 
const COLD_URL = "https://images.unsplash.com/photo-1645883635262-6a82490ce0d0?q=80&w=867&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const HOT_URL = "https://images.unsplash.com/photo-1611856862210-2482401565a3?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const RAIN_URL = "https://images.unsplash.com/photo-1599806112354-67f8b5425a06?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";



  const getImageUrl = () => {
    if (info.humidity > 80) return RAIN_URL;
    if (info.temp > 15) return HOT_URL;
    return COLD_URL;
  };

  return (
    <div className="InfoBox">
      <div className="cardContainer">
        <Card>
          <CardMedia
            component="img"
            alt="weather"
            height="160"
            image={getImageUrl()}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="span">
              <div>Temperature: {info.temp}&deg;C</div>
              <div>Humidity: {info.humidity}</div>
              <div>Min Temp: {info.tempMin}</div>
              <div>Max Temp: {info.tempMax}</div>
              <p>
                The weather can be described as <i>{info.weather}</i> and feels
                like {info.feelsLike}&deg;C.
              </p>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
