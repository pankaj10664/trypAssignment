import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react"
import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from "react-icons/io5"
import { ReactElement } from "react"

interface FeatureProps {
  text: string
  iconBg: string
  icon?: ReactElement
}

const About = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function SplitWithImage() {
  return (
    <Container maxW={"5xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Our Story
          </Text>
          <Heading>we are who live in your dreams of travelling</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
          
We have all been there… dozens of tabs open, buying flights on ten different pages, and managing everything ourselves. The upselling in maze-like websites… And then you forget to check-in in that low-cost carrier in time, and suddenly the trip starts getting expensive. In 2019, during a pandemic, we got tired of these issues, formed a team of young engineering students and marketeers, and started working on Tryp.com.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <About
              icon={
                <Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"Trip Planning"}
            />
            <About
              icon={<Icon as={IoLogoBitcoin} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"Financial Planning"}
            />
            
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={
              "https://www.tryp.com/static/about/our-story.jpeg"
            }
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  )
}
