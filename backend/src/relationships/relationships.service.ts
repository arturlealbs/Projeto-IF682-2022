import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { RelationshipInput } from './dto/relationship.input';
import { UpdateRelationshipInput } from './dto/update-relationship.input';
import { RelationshipDocument } from './schemas/relationship.schema';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectModel('relationships')
    private relationModel: Model<RelationshipDocument>,
  ) {}

  async create(createRelationshipInput: RelationshipInput) {
    const { email, contactEmail } = createRelationshipInput;
    const hasRelation = await this.findOne(createRelationshipInput);
    if (hasRelation) return;

    const createdUser = new this.relationModel({
      contacts: [email, contactEmail],
      blockedEmail: '',
      blocked: false,
    });
    return createdUser.save();
  }

  async findAll(email: string) {
    const aggregation = this.relationModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'contacts',
          foreignField: 'email',
          as: 'infos',
        },
      },
      {
        $match: { contacts: email },
      },
      {
        $project: {
          contacts: 1,
          blocked: 1,
          infos: {
            email: 1,
            username: 1,
            firstName: 1,
            profileImg: 1,
            lastName: 1,
            gender: 1,
            bio: 1,
          },
        },
      },
    ]);
    return aggregation.exec();
  }

  findOne(searchRelationshipInput: RelationshipInput) {
    const { email, contactEmail } = searchRelationshipInput;
    const userList = this.relationModel.findOne({
      $or: [
        { contacts: [email, contactEmail] },
        { contacts: [contactEmail, email] },
      ],
    });
    return userList.exec();
  }

  async update(updateRelationshipInput: UpdateRelationshipInput) {
    const { email, contactEmail, blocked } = updateRelationshipInput;

    const oldRelationship = await this.findOne({ email, contactEmail });
    if (oldRelationship.blockedEmail === email) return;

    const blockedEmail = blocked ? contactEmail : '';
    return this.relationModel
      .findOneAndUpdate(
        {
          $or: [
            { contacts: [email, contactEmail] },
            { contacts: [contactEmail, email] },
          ],
        },
        {
          blocked,
          blockedEmail,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  remove(searchRelationshipInput: RelationshipInput) {
    const { email, contactEmail } = searchRelationshipInput;
    return this.relationModel
      .findOneAndRemove({
        $or: [
          { contacts: [email, contactEmail] },
          { contacts: [contactEmail, email] },
        ],
      })
      .exec();
  }
}
