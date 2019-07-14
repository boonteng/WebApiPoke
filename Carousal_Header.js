import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png',
      caption:
        'International Pokemon Logo'
  },
  {
    src:
      'https://o.aolcdn.com/images/dims?quality=85&image_uri=http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F6623d5a6ae583f81ee3515b6b3615c7f%2F204855766%2Flandscape-1456483171-pokemon2.jpg&client=amp-blogside-v2&signature=a66341cc83efebc3c63cadf0db972d9a16e1b05d',
      caption:
        'Bulbasaur & Pikachu & Charmander & Squirtle'
  },
  {
    src:
      'https://cdn.vox-cdn.com/thumbor/IKt535q8LMnJDddmLL74TBtzv88=/0x266:1024x949/1280x854/cdn.vox-cdn.com/uploads/chorus_image/image/48942277/N3DS_PokemonSuperMysteryDungeon_MainIllustration_png_jpgcopy.0.0.jpg',
      caption:
        'Pokemon Super Mystery Dungeon MainIllustration'
  },
  {
    src:
      'http://getwallpapers.com/wallpaper/full/f/3/3/53560.jpg',
    caption:
      'Charmander'
  },
  {
    src:
      'https://i.pinimg.com/originals/fc/15/89/fc158956845d8a992e748270d2192e03.jpg',
      caption:
        'Cute Pokemon'
  },
  
];

class Carousal_Header extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
  
         
          <img
            style={{ height: '250px', width: '1200px' }}
            src={item.src}
            alt={item.altText}
          />
          <CarouselCaption
            //captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    );
  }
}

export default Carousal_Header;
