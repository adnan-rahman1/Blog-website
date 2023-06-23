import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import CardActionArea from "@mui/material/CardActionArea";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";

const StyledPostCard = styled(Card)(({ theme }) => ({
  borderRadius: 2,
  borderBottom: `2px solid ${theme.palette.secondary.light}`,
  borderLeft: `2px solid ${theme.palette.primary.light}`,
}));
const StyledCardHeader = styled(CardHeader)({
  padding: "0 auto",
  paddingTop: 10,
});
const StyledBlogSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
}));
const StyledChip = styled(Chip)({
  margin: 1,
});

const BlogCard = ({ posts }) => {
  const theme = useTheme();
  const xxScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const xsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useSelector((rs) => ({ ...rs.userReducer }));
  const { globalLoading } = useSelector((s) => ({ ...s.notificationReducer }));

  return (
    <ImageList
      style={{ marginTop: 8, padding: 0 }}
      variant="masonry"
      cols={xxScreen ? 1 : xsScreen ? 1 : 2}
      gap={xxScreen ? 24 : xsScreen ? 24 : 5}
    >
      {posts.map((post, index) => (
        <ImageListItem key={post.id}>
          <Grow key={post.id} in={!globalLoading} timeout={150 * (index + 2)}>
            <StyledPostCard variant="elevation">
              <CardActionArea
                disableRipple
                component={Link}
                to={`/blog/${post.id}/${post.slug}`}
              >
                <CardHeader
                  style={{
                    padding: "8px 16px 0px 0px",
                  }}
                  action={
                    <Typography
                      style={{ fontStyle: "italic" }}
                      color="secondary"
                      variant="body2"
                    >
                      {post.humanReadableDate}
                    </Typography>
                  }
                />
                <StyledCardHeader
                  title={
                    <Typography
                      variant="h5"
                      style={{
                        fontWeight: 410,
                        color: theme.palette.secondary.light,
                      }}
                    >
                      {post.title}
                    </Typography>
                  }
                  subheader={post.subTitle}
                />
              </CardActionArea>

              <CardContent style={{ paddingTop: 8, paddingBottom: 10 }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Grid item xs={12} sm={12} md={12} lg={4}>
                    <CardHeader
                      style={{
                        paddingTop: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                      }}
                      component={Link}
                      to="/about"
                      title={
                        <StyledBlogSubtitle variant="subtitle1">
                          {user.firstName
                            ? `${user.firstName} ${user.lastName}`
                            : "Admin"}
                        </StyledBlogSubtitle>
                      }
                      subheader="Author"
                      avatar={
                        <StyledAvatar
                          alt="Adnan Rahman"
                          src={
                            user.avatar != null
                              ? [user.avatar.location, user.avatar.name].join(
                                  "/"
                                )
                              : ""
                          }
                        />
                      }
                    />
                    <Hidden mdUp>
                      <Divider
                        style={{
                          background: theme.palette.primary.light,
                          opacity: 0.3,
                        }}
                      />
                    </Hidden>
                  </Grid>

                  <Grid item xs={6} sm={6} md={6} lg={4}>
                    <Typography color="secondary" variant="subtitle1">
                      Tags
                    </Typography>
                    {post.tags.map((tag) => (
                      <StyledChip
                        sx={{
                          borderRadius: "3px",
                          color: "#fff",
                          background: theme.palette.success.light,
                        }}
                        key={tag.id}
                        label={tag.name}
                      />
                    ))}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={4}>
                    <Typography color="secondary" variant="subtitle1">
                      Categories
                    </Typography>
                    {post.categories.map((category) => (
                      <StyledChip
                        sx={{
                          borderRadius: "3px",
                          color: "#fff",
                          background: theme.palette.primary.light,
                        }}
                        key={category.id}
                        label={category.name}
                      />
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
            </StyledPostCard>
          </Grow>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default BlogCard;
