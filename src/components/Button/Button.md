### Button

```jsx
<button>button</button>
```

#### Props Type

```js
    {
	    restProps
        type: PropTypes.string,
        to: PropTypes.string,
        href: PropTypes.string,
        classNames: PropTypes.string,
        boxView: PropTypes.bool,
        underlineView: PropTypes.bool,
        children: PropTypes.any,
        onClick: PropTypes.func
    }
```

#### Styled SCSS

```scss
.button {
	position: relative;
	display: inline-flex;
	vertical-align: middle;
	text-align: center;
	box-sizing: border-box;
	align-items: center;
	justify-content: center;
	text-decoration: none !important;
	outline: none;
	-webkit-appearance: none;
	cursor: pointer;
	user-select: none;
	font-family: Roboto, sans-serif;
	font-weight: 400;
	font-size: 16px;
	text-transform: uppercase;
	background-color: #fff;
	box-shadow: none;
	border: 1px solid #d1d1d1;
	color: #767676;
	padding: 8px 32px;

	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

	&:focus,
	&:hover {
		border-color: #767676;
	}

	&.active {
		background-color: red;
		color: #000;
	}

	&._outline {
		border-color: #6b78d6;
		background-color: transparent;
		color: #6b78d6;

		&:focus,
		&:hover {
			background-color: #6b78d6;
			color: #fff;
		}
	}
}
```
