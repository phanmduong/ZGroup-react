import React from 'react';

class NewPageComponent extends React.Component {
	constructor(props) {
		    super(props)
		    this.state = {
	            icons : [
	            	{avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/space-night.jpg"},
					{avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/space-galaxy.jpg"},
					{avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/amazing-hd-picture-of-planet.jpg"},
					{avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/beautiful-space.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/beauty-of-space.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/bleading-earth.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/blue-planets.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/crepusculum.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/icy-space.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/rising-sun-in-space.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/beautiful-earth-closup.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/planet-clouds-and-moon-star.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/space-night.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/amazing-hd-picture-of-planet.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/space-galaxy.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/bleading-earth.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/space-night.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/space-night.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/bleading-earth.jpg"},
					// {avatar_url:"https://media02.hongkiat.com/60-absolutely-stunning-space-and-planets-wallpapers/space-night.jpg"},
	            ]
		    }
		}
	render(){		
		return (
                <tr>
                    <td className="already-paid-icons">
                    	{this.state.icons.map((icon, index) => { return (
                        	<div className="already-paid-icons-stack" key={index}>
                        		<img src={icon.avatar_url}/>
                        	</div>
                        )})}
                        <div className="already-paid-icons-plus">
                        	<i className="material-icons">add</i> 
                        </div>
                    </td>
                </tr>    
		)
	} 
}


export default NewPageComponent;