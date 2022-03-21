import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  FormControl,
  Button,
} from "@chakra-ui/react"
import {GameVariables} from "../types"

interface Props {
  isOpen: boolean
  onClose: () => void
  gameVariables: GameVariables
  setGameVariables: React.Dispatch<React.SetStateAction<GameVariables>>
  onGameStart: () => void
  maxMines: number
}

const windowsButtonStyle = {
  borderRadius: "none",
  borderWidth: "2px",
  borderTopColor: "lightGray",
  borderLeftColor: "lightGray",
  borderRightColor: "black",
  borderBottomColor: "black",
  bgColor: "silver",
  width: "25px",
  height: "25px",
  color: "black",
  marginBottom: "8px",
  _hover: {bg: "#C0C0C0"},
  _active: {
    borderTopColor: "black",
    borderLeftColor: "black",
    borderRightColor: "lightGray",
    borderBottomColor: "lightGray",
  },
}

export function NewGameModal({
  isOpen,
  onClose,
  setGameVariables,
  gameVariables,
  onGameStart,
  maxMines,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalContent
        borderRadius={0}
        bgColor="#C0C0C0"
        borderWidth="1px"
        borderTopColor="lightGrey"
        borderLeftColor="lightGrey"
        borderRightColor="Gray"
        borderBottomColor="Gray"
        p="1px"
      >
        <ModalHeader
          fontSize="lg"
          fontWeight="bold"
          p={1}
          pl={2}
          m={0}
          borderRadius={0}
          bgColor={"blue"}
          color="white"
          borderWidth="2px"
          borderTopColor="white"
          borderLeftColor="white"
          borderRightColor="white"
          borderBottom="none"
          pr={0}
        >
          Mine Sweeper
          <ModalCloseButton {...windowsButtonStyle} />
        </ModalHeader>
        <Flex
          borderWidth="2px"
          borderTopWidth="0px"
          borderLeftColor="white"
          borderRightColor="white"
          borderBottomColor="white"
          height="100%"
          p={8}
          direction="column"
        >
          <FormControl id="xAxis">
            <FormLabel>Squares wide</FormLabel>
            <NumberInput
              variant="windows"
              max={25}
              clampValueOnBlur={false}
              value={gameVariables.gameXCount}
              onChange={(value) => {
                if (value.length && parseInt(value) > 0) {
                  setGameVariables({
                    ...gameVariables,
                    gameXCount: parseInt(value),
                  })
                } else {
                  setGameVariables({
                    ...gameVariables,
                    gameXCount: 0,
                  })
                }
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="yAxis" mt={4}>
            <FormLabel>Squares high</FormLabel>
            <NumberInput
              variant="windows"
              max={25}
              clampValueOnBlur={false}
              value={gameVariables.gameYCount}
              onChange={(value) => {
                if (value.length && parseInt(value) > 0) {
                  setGameVariables({
                    ...gameVariables,
                    gameYCount: parseInt(value),
                  })
                } else {
                  setGameVariables({
                    ...gameVariables,
                    gameYCount: 0,
                  })
                }
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="mineCount" mt={4}>
            <FormLabel>Number of mines</FormLabel>
            <NumberInput
              variant="windows"
              defaultValue={10}
              max={maxMines}
              clampValueOnBlur={false}
              value={gameVariables.mineCount}
              onChange={(value) => {
                if (value.length && parseInt(value) > 0) {
                  setGameVariables({
                    ...gameVariables,
                    mineCount: parseInt(value),
                  })
                } else {
                  setGameVariables({
                    ...gameVariables,
                    mineCount: 0,
                  })
                }
              }}
              onBlur={async (e) => {
                if (e.target.value.length) {
                  let val = parseInt(e.target.value)
                  if (val > 0 && val >= maxMines) {
                    setTimeout(() => {
                      setGameVariables({
                        ...gameVariables,
                        mineCount: maxMines,
                      })
                    }, 2000)
                  }
                }
                return
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Flex justify="space-evenly">
            <Button
              m={4}
              w="45%"
              onClick={() => {
                onGameStart()
              }}
            >
              Start Game
            </Button>
            <Button
              m={4}
              w="45%"
              colorScheme="red"
              onClick={() => {
                onClose()
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
