import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const StyledChip = styled(Chip)({
  margin: 2,
});
const SideCard = ({ title, data, loading }) => {
  return (
    <Fade in={true} timeout={500}>
      <Card elevation={1} style={{ marginTop: 16 }}>
        <CardHeader
          color="secondary"
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography color="secondary" variant="h6">{title}</Typography>
              {loading && (
                <CircularProgress color="secondary" style={{ marginLeft: "auto" }} size={20} />
              )}
            </div>
          }
          style={{ paddingBottom: 0 }}
        />
        <CardContent>
          {data.map((ele) => (
            <StyledChip
              color="secondary"
              variant="outlined"
              key={ele.id}
              label={ele.name}
            />
          ))}
        </CardContent>
      </Card>
    </Fade>
  );
};

export default SideCard;
