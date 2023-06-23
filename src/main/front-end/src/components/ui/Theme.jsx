const blue = "#3943B7";
const drk = "#2F2E41";
const dim = "#8FB6DC";
const wht = "#FBF8EB";
const suc = "#2e7d32";

const getUserChoiceTheme = (mode) => ({
    palette: {
        mode,
        ...(mode === "light" ?
            {
                text: {
                    primary: `${drk}`
                },
                background: {
                    default: "rgba(236, 237, 248, 0.9)",
                    paper: "#fafafa",
                    dim: `${dim}`,
                    wht: `${wht}`
                },
                primary: {
                    main: `${blue}`,
                    mainGradient: "linear-gradient(to right, #00c6ff, #0072ff)",
                },
                secondary: {
                    main: `${drk}`
                },
            }
            : {
                text: {
                    primary: "#fafafa",
                },
                background: {
                    // default: "rgba(47, 46, 65, 0.90)",
                    default: `${drk}`,
                    paper: `${drk}`
                },
                primary: {
                    main: "rgba(57, 67, 183, 0.85)"
                },
                secondary: {
                    main: "#fafafa"
                }

            }),
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                enableColorOnDark: true,
            },
        },
    },
});


export default getUserChoiceTheme;