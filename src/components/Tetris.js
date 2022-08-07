import React, { useState } from 'react'
import { checkCollision, createStage, LEFT, RIGHT, DOWN, UP } from '../helpers'
//Custom Hooks
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'
//Components
import Stage from './Stage'
import Display from './Display'
import Button from './Button'
//Styled Components
import { ButtonsWrapper } from './Button'
import {
  StyledTetrisWrapper,
  StyledTetris,
  StyledText,
  StyledTitle,
} from './styles/StyledTetris'

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [player, updatePlayerPos, resetPlayer] = usePlayer()
  const [stage, setStage] = useStage(player, resetPlayer)
  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 })
    }
  }
  const startGame = () => {
    setStage(createStage())
    resetPlayer()
    setGameOver(false)
  }
  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!')
        setGameOver(true)
        setDropTime(null)
      }
      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
  }

  const dropPlayer = () => {
    drop()
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === LEFT) {
        movePlayer(-1)
      } else if (keyCode === RIGHT) {
        movePlayer(1)
      } else if (keyCode === DOWN) {
        dropPlayer()
      } else if (keyCode === UP) {
      }
    }
  }

  console.log('re-render')
  return (
    <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={(e) => move(e)}>
      <StyledTitle>TETRIS AI</StyledTitle>
      <StyledTetris>
        <div>
          <StyledText>HOLD</StyledText>
          <Stage stage={createStage(4, 4)} />
        </div>
        <Stage stage={stage} type={'main'} />
        <div>
          <StyledText>NEXT</StyledText>
          <Stage stage={createStage(4, 4)} />
          {gameOver ? (
            <Display gameOver={gameOver} text='Game Over' />
          ) : (
            <div>
              <Display text='Lines' />
            </div>
          )}
        </div>
      </StyledTetris>
      <ButtonsWrapper>
        <Button type={'Play'} size={'large'} callback={startGame} />
      </ButtonsWrapper>
      <ButtonsWrapper>
        <Button type={'Train AI'} />
        <Button type={'AI Play'} />
      </ButtonsWrapper>
    </StyledTetrisWrapper>
  )
}
export default Tetris
