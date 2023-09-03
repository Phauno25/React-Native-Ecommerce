# The Retro Cave

The Retro Cave® is an online store that allows you to have the original digital/physical file of your favorite retro game.
It features the most popular games developed between the 80's and early 2000's.

## Download

Using GIT: Open the git console inside the directory where you want to clone this project. Then execute _git clone https://github.com/Phauno25/React-Native-Ecommerce.git_ to create a clone folder of this repository.

Zip file: Click de button "<>Code" located at the upper part of the files table and select the "Download ZIP" option. Then once downloaded unzip the files on the desired location in your explorer.

## Installing Dependencies

Use the package manager npm to install dependencies.

```bash
npm i
```

## Custom Components

The Retro Caves features some custom components that will be released with the alpha release of the RetroCave design system.
Some examples and usage below:

```javascript

# CUSTOM TEXT
# props:

fontSize (int),
textAlign ('center','left','rigth') default left,
color (Can be global colors from the theme or #HEX) default 'textPrimary'
style (obj) (Additional styles)
variant ('bold','semiBold') default 'semiBold'

<CustomText fontSize={18} color="secondary" textAlign="center" style={{lineHeigth:22}}>loren ipsum <CustomText>

# CUSTOM BUTTON
# props:

fontSize (int),
onPress (callBack for the press event)
color (Can be global colors from the theme or #HEX) default 'textPrimary'
style (obj) (Additional styles)
variant ('link','filled') default 'filled' (more variant in future releases)

<CustomButton fontSize={18} color="tertiary" onPress={handlePress} style={{padding:22}}>loren ipsum <CustomButton>

# CUSTOM CONTAINER
# props:

variant = ('view','scrollView')
bgColor (Can be global colors from the theme or #HEX) default 'textPrimary'
alignV = ("flex-start","flex-end","center","space-between","space-around","space-evenly") default 'flex-start'
style (obj) (Additional styles)

<Container bgColor="secondary" alignV={"center"} style={{padding:22}}>loren ipsum <Container>


```

## Run Application

```bash
npm i
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
