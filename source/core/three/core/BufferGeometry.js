"use strict";

THREE.BufferGeometry.prototype.toJSON = function()
{
	var data =
	{
		metadata:
		{
			version: 4.5,
			type: "BufferGeometry",
			generator: "BufferGeometry.toJSON"
		}
	};
	
	data.uuid = this.uuid;
	data.type = this.type;
	data.name = this.name;

	if(this.parameters !== undefined)
	{
		var parameters = this.parameters;

		for(var key in parameters)
		{
			if(parameters[key] !== undefined)
			{
				data[key] = parameters[key];
			}
		}

		return data;
	}

	data.data = {attributes: {}, morphAttributes: {}};

	var index = this.index;

	if(index !== null)
	{
		var array = Array.prototype.slice.call(index.array);

		data.data.index =
		{
			type: index.array.constructor.name,
			array: array
		};
	}

	var attributes = this.attributes;
	for(var key in attributes)
	{
		var attribute = attributes[key];
		var array = Array.prototype.slice.call(attribute.array);

		data.data.attributes[key] =
		{
			itemSize: attribute.itemSize,
			type: attribute.array.constructor.name,
			array: array,
			normalized: attribute.normalized
		};
	}

	var morphAttributes = this.morphAttributes;
	for(var key in morphAttributes)
	{
		var attributeArray = this.morphAttributes[key];
		var array = [];
		for(var i = 0; i < attributeArray.length; i ++)
		{
			var attribute = attributeArray[i];

			array.push({
				name: attribute.name,
				itemSize: attribute.itemSize,
				type: attribute.array.constructor.name,
				array: Array.prototype.slice.call(attribute.array),
				normalized: attribute.normalized
			});
		}

		data.data.morphAttributes[key] = array;
	}

	var groups = this.groups;
	if(groups.length > 0)
	{
		data.data.groups = JSON.parse(JSON.stringify(groups));
	}

	var boundingSphere = this.boundingSphere;
	if(boundingSphere !== null)
	{
		data.data.boundingSphere =
		{
			center: boundingSphere.center.toArray(),
			radius: boundingSphere.radius
		};
	}

	return data;
};