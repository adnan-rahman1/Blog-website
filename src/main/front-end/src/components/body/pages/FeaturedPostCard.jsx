import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "inherit",
  margin: "0px 24px 24px 24px",
}));
const StyledCardContent = styled(CardContent)(({theme}) => ({
  margin: "auto",
}));
const StyledCardMedia = styled("img")(({ theme }) => ({
  objectFit: "cover",
  maxWidth: "100%",
  width: "100%",
  height: "200px"
}));
const StyledBlogTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const FeaturedPostCard = ({ post, user }) => {
  return (
    <StyledCard variant="elevation" elevation={0}>
      <Grid container item xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={5} md={5} lg={6}>
          <StyledCardMedia
            component="img"
            src={
              post.pictures.length > 0 && post.pictures[0] != undefined
                ? [post.pictures[0].location, post.pictures[0].name].join("/")
                : ""
            }
            title={
              post.pictures.length > 0 && post.pictures[0] != undefined
                ? post.pictures[0].name
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={6}>
          <StyledCardContent>
            <Grid container direction="column">
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <StyledBlogTitle
                  color="secondary"
                  variant="h5"
                  component={Link}
                  to={`/blog/${post.id}/${post.slug}`}
                >
                  {post.title}
                </StyledBlogTitle>
                <Typography style={{ opacity: 0.7 }} variant="subtitle1">
                  {post.subTitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CardHeader
                  color="primary"
                  style={{ paddingLeft: "0" }}
                  component={Link}
                  to="/about"
                  avatar={
                    <Avatar
                      
                      src={user ? [user.avatar.location, user.avatar.name].join("/") : ""}
                      aria-label="recipe"
                    />
                  }
                  title={
                    <Typography variant="subtitle1" color="secondary">
                      {user
                        ? `${user.firstName} ${user.lastName}`
                        : "Admin"}
                    </Typography>
                  }
                  subheader={post.humanReadableDate}
                />
              </Grid>
            </Grid>
          </StyledCardContent>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default FeaturedPostCard;
