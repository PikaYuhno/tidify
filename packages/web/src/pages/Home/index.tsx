import React from 'react';
// @ts-ignore
import {Main} from './styles.ts';
// @ts-ignore
import {Image} from './styles.ts';
// @ts-ignore
import {StyledText} from './styles.ts';
// @ts-ignore
import {Grid} from './styles.ts';
// @ts-ignore
import {GlobalStyle} from "./styles.ts";
import white from './white.png';

class Home extends React.Component {
    render() {
        return (
            <>
                <GlobalStyle/>
                <Main>
                    <Image src={white}/>
                    <StyledText weight={"bold"} margin={"0 0 -5px 7%"}>register.</StyledText>
                    <Grid>

                    </Grid>
                </Main>
            </>

        );
    }
}

export default Home;
