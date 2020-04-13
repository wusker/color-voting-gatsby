/** @jsx jsx */
import { useEffect, useState } from 'react';
import { Styled, jsx } from 'theme-ui';
import randomColor from 'random-hex-color';
import contrast from 'get-contrast';
import namer from 'color-namer';

import Layout from '../components/layout';

const getColorPair = () => {
  const colorA = randomColor();
  let colorB = randomColor();

  while (!contrast.isAccessible(colorA, colorB)) {
    colorB = randomColor();
  }

  return [
    colorA,
    colorB
  ]
}

const Button = ({ color, backgroundColor, borderColor, ...props }) => (
  <button
    sx={{
      color,
      backgroundColor,
      border: 'thin solid',
      borderColor,
      p: 4,
      py: 3,
      fontSize: 3,
      fontWeight: 500,
    }}
    {...props}
  >

  </button>
)

const ContrastBox = ({ color, backgroundColor }) => (
  <div
    sx={{
      color,
      backgroundColor,
      padding: [4, 5, 6],
      width: ['100%', '50%', '50%'],
      mt: [3, 4, 5],
      mb: [4, 4, 4],
      fontWeight: 700,
    }}
  >
    <Styled.h4
      sx={{
        fontSize: 3,
        m: 0,
        mb: 3,
      }}
    >
      {namer(color).pantone[0].name}
    </Styled.h4>
    <Styled.h3
      sx={{
        m: 0,
        fontSize: [4, 5, 6],
      }}
    >
      {color}
    </Styled.h3>
  </div>
)

const ContrastBoxes = ({ colorPair }) => (
  <div
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
    }}
  >
    <ContrastBox
      color={colorPair[0]}
      backgroundColor={colorPair[1]}
    />
    <ContrastBox
      color={colorPair[1]}
      backgroundColor={colorPair[0]}
    />
  </div>
)

export default () => {
  const [colorPair, setColorPair] = useState([]);

  const newColorPair = () => {
    setColorPair(getColorPair());
  }

  const upVote = () => {
    console.log('upvote!');
    newColorPair();
  }

  const downVote = () => {
    console.log('downvote!');
    newColorPair();
  }

  const skip = () => {
    console.log('skip!');
    newColorPair();
  }

  const handleKeyUp = e => {
    const { key } = e;
    if (key === 'ArrowUp') {
      upVote();
    } else if (key === 'ArrowDown') {
      downVote();
    } else if (key === 'ArrowRight' || key === 'ArrowLeft') {
      skip();
    }
  }

  useEffect(() => {
    newColorPair();
  }, []);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorPair]);

  if (!colorPair.length) {
    return (
      <Layout>
        <Styled.h1>Generating a new color pair...</Styled.h1>
      </Layout>
    )
  }

  const [colorA, colorB] = colorPair;

  const contrastRatio = contrast.ratio(colorA, colorB).toFixed(2);
  const contrastScore = contrast.score(colorA, colorB);

  return (
    <Layout colorPair={colorPair}>
      <Styled.p
        sx={{
          textAlign: 'center',
          fontWeight: 500,
          fontSize: [2, 3, 4],
        }}
      >
        {contrastRatio} contrast {contrastScore}
      </Styled.p>
      <ContrastBoxes colorPair={colorPair} />
      <div
        sx={{
          pt: [3, 4, 5],
          textAlign: 'center',
        }}
      >
        <Button
          color={colorB}
          backgroundColor={colorA}
          onClick={upVote}
        >
          Upvote
                    </Button>
        <Button
          color={colorA}
          backgroundColor={colorB}
          onClick={downVote}
          sx={{
            ml: 2,

          }}
        >
          Down Vote
                    </Button>
        <br />
        <Button
          color={colorA}
          backgroundColor={colorB}
          borderColor={colorB}
          onClick={skip}
          sx={{
            mt: 3,
            ml: -3,
          }}
        >
          Skip
                    </Button>
      </div>
      {/* <pre>{JSON.stringify(colorPair)}</pre> */}
    </Layout>
  )
}
