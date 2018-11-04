const gallaryModel = {
	currentImage : {},
    images : [
        {
        	main_url : 'https://www.thahara.com/uploads/blog/2017/05/cover__thahara-1494582786_Bagan-Temple-Sunset-View-Mandalay-Myanmar.jpg',
			thumbnail : 'https://www.thahara.com/uploads/blog/2017/05/cover__thahara-1494582786_Bagan-Temple-Sunset-View-Mandalay-Myanmar.jpg',
			title:'image1'
        },
        {
        	main_url : 'http://www.thislifeintrips.com/wp-content/uploads/2015/08/IMG_0587.jpg',
			thumbnail : 'http://www.thislifeintrips.com/wp-content/uploads/2015/08/IMG_0587.jpg',
			title:'image2'
        },
        {
        	main_url : 'https://nomadicboys.com/wp-content/uploads/2015/03/05-Buledi-pagoda-sunset7.jpg',
			thumbnail : 'https://nomadicboys.com/wp-content/uploads/2015/03/05-Buledi-pagoda-sunset7.jpg',
			title:'image3'
        },
        {
        	main_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkO6hm4OeWGIe5tzffyJQ-9F1HSKIMWM-FLr_rH0dkI9FLaTjCg',
			thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkO6hm4OeWGIe5tzffyJQ-9F1HSKIMWM-FLr_rH0dkI9FLaTjCg',
			title:'image4'
        },
        {
        	main_url : 'https://s3-us-west-1.amazonaws.com/exoticvoyages-wp/wp-content/uploads/2016/12/27082121/The-Temples-of-Bagan-Sunset-in-Myanmar.jpg',
			thumbnail : 'https://s3-us-west-1.amazonaws.com/exoticvoyages-wp/wp-content/uploads/2016/12/27082121/The-Temples-of-Bagan-Sunset-in-Myanmar.jpg',
			title:'image5'
        },
        {
        	main_url : 'https://www.thahara.com/uploads/blog/2017/05/cover__thahara-1494582786_Bagan-Temple-Sunset-View-Mandalay-Myanmar.jpg',
			thumbnail : 'https://www.thahara.com/uploads/blog/2017/05/cover__thahara-1494582786_Bagan-Temple-Sunset-View-Mandalay-Myanmar.jpg',
			title:'image6'
        },
        {
        	main_url : 'https://bagandaytours.com/wp-content/uploads/2015/11/Irrawaddy-River-4.jpg',
			thumbnail : 'https://bagandaytours.com/wp-content/uploads/2015/11/Irrawaddy-River-4.jpg',
			title:'image7'
        },
        {
        	main_url : 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1442915382175/shutterstock-281729135small_main_1442915415746.jpeg',
			thumbnail : 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1442915382175/shutterstock-281729135small_main_1442915415746.jpeg',
			title:'image8'
        },
        {
        	main_url : 'http://www.thislifeintrips.com/wp-content/uploads/2015/08/IMG_0587.jpg',
			thumbnail : 'http://www.thislifeintrips.com/wp-content/uploads/2015/08/IMG_0587.jpg',
			title:'image9'
        },
        {
        	main_url : 'https://nomadicboys.com/wp-content/uploads/2015/03/05-Buledi-pagoda-sunset7.jpg',
			thumbnail : 'https://nomadicboys.com/wp-content/uploads/2015/03/05-Buledi-pagoda-sunset7.jpg',
			title:'image10'
        }
    ]
}

const controller = {
	init : function(){
		imageListView.init();
		imagePopupView.init();
	},
	getAllImages : function(){
		return gallaryModel.images;
	},
	setCurrentImage : function(image) {
		gallaryModel.currentImage = image;		
	},
	getCurrentImage : function(){
		return gallaryModel.currentImage;
	},
};

const imageListView = {
	init : function(){
		this.imageHolder = document.querySelector('.gallery');
		this.render();
	},
	render : function() {
		const images = controller.getAllImages();
		for(let i in images) {
			const image = images[i];
			this.imageHolder.appendChild(this.buildImage(image));
		}		
	},
	buildImage : function(image){
		const div = document.createElement('div');
		console.log(div);
		div.classList.add('image-holder');
		div.innerHTML = `
			<img src="${image.thumbnail}"/>
		`;
		div.addEventListener('click',function(){
            controller.setCurrentImage(image);
			imagePopupView.render();
        });

		return div;
	}
}

const imagePopupView = {
	init: function(){
		this.popuparea = document.querySelector('.popuparea');
		this.viewer = document.querySelector('.viewer');
		this.popupImage = document.querySelector('.viewer img');
		this.title = document.querySelector('.title');		
		this.closeBtn = document.querySelector('.popuparea .closeImage');
		this.rotatebtn = document.querySelector('.viewer .btnRotate');
		this.rotateimg = document.querySelector('.viewer img');	
		this.downloadimg = document.querySelector('.viewer a');
		this.closeBtn.addEventListener('click',function(){
			imagePopupView.hide();
		});

	    this.rotatebtn.addEventListener('click',function(e){
			imagePopupView.rotate();
		});

	},
	render: function(){
		const image = controller.getCurrentImage();				
		this.popuparea.classList.add("show");		
		this.popupImage.src =image.main_url;
		//this.downloadimg.href = image.main_url;
		this.title.innerHTML = image.title;
	},
	hide: function() {
		this.popuparea.classList.remove("show");
		this.popupImage.src = '#';
	},
	rotate:function(){
		var rotate = parseInt(this.rotateimg.dataset.deg);
		let newrotate;
		console.log(rotate);
		if(rotate <270){
			newrotate = rotate + 90;
			this.rotateimg.dataset.deg = newrotate;
			if(newrotate == 90){
				this.popupImage.classList.add(`rotate-90`);
			}
			else if(newrotate == 180){
				this.popupImage.classList.add(`rotate-180`);
			}
			else if(newrotate == 270){
				this.popupImage.classList.add(`rotate-270`);
			}
		}		
	},
	download:function(){
		this.curimage = controller.getCurrentImage();		
		console.log(this.curimage);
		this.downloadimg.href = imagePopupView.curimage.main_url;
		
	}
}

controller.init();