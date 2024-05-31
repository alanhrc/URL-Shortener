import { randomUUID } from 'node:crypto'

import { Replace } from 'src/helpers/Replace'

export interface ILinkProps {
  urlOrigin: string
  urlHash: string
  clicks: number
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
  userId?: string | null
}

export class Link {
  private _id: string
  private props: ILinkProps

  constructor(props: Replace<ILinkProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public get urlOrigin(): string {
    return this.props.urlOrigin
  }

  public set urlOrigin(urlOrigin: string) {
    this.props.urlOrigin = urlOrigin
  }

  public get urlHash(): string {
    return this.props.urlHash
  }

  public set urlHash(urlHash: string) {
    this.props.urlHash = urlHash
  }

  public get clicks(): number {
    return this.props.clicks
  }

  public set clicks(_) {
    this.props.clicks = this.clicks + 1
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt
  }

  public blockLink() {
    this.props.deletedAt = new Date()
  }

  public unBlockLink() {
    this.props.deletedAt = null
  }

  public get userId(): string | null | undefined {
    return this.props.userId
  }

  public set userId(userId: string) {
    this.props.userId = userId
  }
}
