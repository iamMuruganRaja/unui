


import React, { useState } from "react";
import styled from "styled-components";
import BlogCard from "./BlogCard";
import "./EventCard.css";

const Container = styled.div`
  // Your styling for the container
`;

const EventCard = ({ event }) => {
  // Track the state of any card being flipped
  

  // Keep track of which cards are flipped
  



  return (
    <Container>
      <BlogCard event={event} />
      {/* Add more BlogCard components if needed */}
    </Container>
  );
};

export default EventCard;
